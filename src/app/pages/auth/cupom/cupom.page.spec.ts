import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CupomPage } from './cupom.page';

describe('CupomPage', () => {
  let component: CupomPage;
  let fixture: ComponentFixture<CupomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CupomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
