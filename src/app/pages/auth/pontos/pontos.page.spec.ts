import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PontosPage } from './pontos.page';

describe('PontosPage', () => {
  let component: PontosPage;
  let fixture: ComponentFixture<PontosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PontosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
