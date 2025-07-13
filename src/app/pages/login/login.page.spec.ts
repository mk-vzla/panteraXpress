import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginPage } from './login.page';

// import { IonicModule, NavController, AlertController } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;
//   let navCtrlSpy: jasmine.SpyObj<NavController>;
//   let alertCtrlSpy: jasmine.SpyObj<AlertController>;

//   beforeEach(async () => {

//     const alertCtrlMock = jasmine.createSpyObj('AlertController', ['create']);
//     const navCtrlMock = jasmine.createSpyObj('NavController', ['navigateForward']);

//     await TestBed.configureTestingModule({
//       declarations: [LoginPage],
//       imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
//       providers: [
//         { provide: NavController, useValue: navCtrlMock },
//         { provide: AlertController, useValue: alertCtrlMock }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
//     alertCtrlSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;

//     // Mock basico para mostarr alerta sin errores reales
//     alertCtrlSpy.create.and.returnValue(Promise.resolve({
//       present: () => Promise.resolve(),
//       onDidDismiss: () => Promise.resolve()
//     } as any));

//     fixture.detectChanges();

//   });

//   it ('deberia crear el componente correctamente', () => {
//     expect(component).toBeTruthy();
//   });

//   it ('debería mostrar alerta si el email no es válido', async () => {
//     component.email = 'invalid-email';
//     component.password = '1212';
//     await component.conectarseLogin();
//     expect (alertCtrlSpy.create).toHaveBeenCalled();
//   });
// });