import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AppComponent } from '../../app/app.component';
import { AccountShowhidePage } from './account-showhide';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 
let comp: AccountShowhidePage;
let fixture: ComponentFixture<AccountShowhidePage>;
let de: DebugElement;
let el: HTMLElement;
 
describe('AccountShowhidePage Component', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [AppComponent, AccountShowhidePage],
           
            providers: [
                NavController
            ],
 
            imports: [
                IonicModule.forRoot(AppComponent)
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(AccountShowhidePage);
        comp     = fixture.componentInstance;
    });

    it ('should create a valid instance of MyApp', () => {
        fixture.detectChanges();
        expect(comp instanceof AccountShowhidePage).toBe(true);
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
 
 
   /* it('initialises with a value of My Current Data', () => {
        expect(comp['customData']).toEqual('My Current Data');
    });
 
    it('can set customData to a new value', () => {
 
        comp.changeData('My New Data');
        fixture.detectChanges();
        expect(comp['customData']).toEqual('My New Data');
       
    });*/
 
});