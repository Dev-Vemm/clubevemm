import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetSenhaPage } from './reset-senha.page';

describe('ResetSenhaPage', () => {
  let component: ResetSenhaPage;
  let fixture: ComponentFixture<ResetSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetSenhaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
