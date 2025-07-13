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


// ////----------------------------------------------------------------------------------------------------------------------------Unitarias
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginPage } from './login.page';

// import { IonicModule, NavController, AlertController, ToastController } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';

// import { MaterialModule } from '../../material.module';



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
//       imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule, MaterialModule],
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

//   it('debería mostrar alerta si el email no es válido', async () => {
//     component.email = 'invalid-email';
//     component.password = '1212';
//     await component.conectarseLogin();
//     expect(alertCtrlSpy.create).toHaveBeenCalled();
//   });

//   it('deberia mostrar alerta si la contrasena esta vacia', async () => {
//     component.email = 'michaelvzla@gmail.com';
//     component.password = '';
//     await component.conectarseLogin();
//     expect(alertCtrlSpy.create).toHaveBeenCalled();
//   });

//   it('deberia mostrar alerta si el email esta vacio', async () => {
//     component.email = '';
//     component.password = '1212';
//     await component.conectarseLogin();
//     expect(alertCtrlSpy.create).toHaveBeenCalled();
//   });

//   it('deberia mostrar alerta si la contrasena tiene formato incorrecto', async () => {
//     component.email = 'michaelvzla@gmail.com';
//     component.password = 'abcd'; // No son 4 números
//     await component.conectarseLogin();
//     expect(alertCtrlSpy.create).toHaveBeenCalled();
//   });

//   it('deberia mostrar alerta si el usuario o contrasena son incorrectos', async () => {
//     component.email = 'otro@email.com';
//     component.password = '9999';
//     await component.conectarseLogin();
//     expect(alertCtrlSpy.create).toHaveBeenCalled();
//   });

//   it('deberia autenticar correctamente si todo es valido y navegar a home', async () => {
//     component.email = 'michaelvzla@gmail.com';
//     component.password = '1212';
//     await component.conectarseLogin();
//     expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith('/home');
//   });

//   it('deberia mostrar toast con: conexion exitosa + email ', async () => {
//     const toastSpy = spyOn(component, 'mostrarToast').and.callThrough();
//     component.email = 'michaelvzla@gmail.com';
//     component.password = '1212';
//     await component.conectarseLogin();
//     expect(toastSpy).toHaveBeenCalledWith('Conexión exitosa: michaelvzla@gmail.com');
//   });

// });