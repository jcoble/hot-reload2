import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { removeNgStyles, createNewHosts, bootloader, createInputTransfer, hmrModule } from '@angularclass/hmr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

//I keep the new line
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store: any) {
    if (!store || !store.state)
      return;
    console.log('HMR store', store);
    console.log('store.state.data:', store.state.data);
    // inject AppStore here and update it
    // this.AppStore.update(store.state)
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  hmrOnDestroy(store: any) {
    var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    store.state = { data: 'yolo' };
    // store.state = Object.assign({}, appState)
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
    // anything you need done the component is removed
  }

  main() {
    return platformBrowserDynamic().bootstrapModule(AppModule)
      // use `hmrModule` or the "@angularclass/hmr-loader"
      .then((ngModuleRef: any) => {
        // `module` global ref for webpackhmr
        // Don't run this in Prod
        return hmrModule(ngModuleRef, AppModule);
      });
  }
}
