import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebSegmentoPage } from './web-segmento.page';

describe('WebSegmentoPage', () => {
  let component: WebSegmentoPage;
  let fixture: ComponentFixture<WebSegmentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSegmentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebSegmentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
