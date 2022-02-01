import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [CalendarComponent],
  declarations: [CalendarComponent],
})
export class CalendarModule {}
