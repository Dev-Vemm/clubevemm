import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfertaCompraFinalComponent } from './oferta-compra-final.component';

describe('OfertaCompraFinalComponent', () => {
  let component: OfertaCompraFinalComponent;
  let fixture: ComponentFixture<OfertaCompraFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaCompraFinalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfertaCompraFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
