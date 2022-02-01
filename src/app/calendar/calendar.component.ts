import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() events: any = [];
  //Top left title of the calendar
  @Input() title;
  //Optional icon to be used in the top right
  @Input() iconPath = '';
  @Output() result = new EventEmitter<any[]>();
  eventDays;
  Feb = 28;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  monthNow = new Date().getMonth();
  days;
  grids;
  currMonth;
  date = new Date();
  isCurrYear;
  curryear;
  currDay = new Date().getDate();
  firstDay = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    1
  ).getDay();
  counter(i: number) {
    return new Array(i);
  }

  constructor() {}

  ngOnInit() {
    //Check if this year is a leap year
    if ((this.year % 1000) % 4 == 0) {
      this.Feb = 29;
    }
    this.curryear = new Date().getFullYear();
    this.isCurrYear = this.year === this.curryear;

    this.setMonth();

    this.setDays();

    this.eventsThisMonth();
  }

  //sets events for the currently selected month and year
  eventsThisMonth() {
    this.eventDays = new Array(this.days);

    for (let i = 0; i < this.days; i++) {
      for (let j = 0; j < this.events.length; j++) {
        let dateObj = this.events[j].scheduled_Date.split('-');
        let scheduled_Day = parseInt(dateObj[2], 10);
        let scheduled_Year = parseInt(dateObj[0], 10);

        //check for month and only use currMonth trips
        if (
          this.month === parseInt(dateObj[1], 10) - 1 &&
          this.year === scheduled_Year
        ) {
          if (scheduled_Day - 1 === i) {
            this.eventDays[i] = true;
          }
        }
        if (this.eventDays[i] !== true) {
          this.eventDays[i] = false;
        }
      }
    }
  }

  leftMonth() {
    this.month--;

    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.setMonth();
    this.setDays();
    this.eventsThisMonth();

    this.isCurrYear = this.year === this.curryear;

    if (this.month !== this.monthNow || this.year !== this.curryear) {
      this.currDay = -1;
    } else {
      this.currDay = new Date().getDate();
    }
  }

  rightMonth() {
    this.month++;

    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.setMonth();
    this.setDays();
    this.eventsThisMonth();

    this.isCurrYear = this.year === this.curryear;

    if (this.month !== this.monthNow || this.year !== this.curryear) {
      this.currDay = -1;
    } else {
      this.currDay = new Date().getDate();
    }
  }

  setMonth() {
    switch (this.month) {
      case 0:
        this.days = 31;
        this.currMonth = 'January';
        break;
      case 1:
        this.days = this.Feb;
        this.currMonth = 'February';
        break;
      case 2:
        this.days = 31;
        this.currMonth = 'March';
        break;
      case 3:
        this.days = 30;
        this.currMonth = 'April';
        break;
      case 4:
        this.days = 31;
        this.currMonth = 'May';
        break;
      case 5:
        this.days = 30;
        this.currMonth = 'June';
        break;
      case 6:
        this.days = 31;
        this.currMonth = 'July';
        break;
      case 7:
        this.days = 31;
        this.currMonth = 'August';
        break;
      case 8:
        this.days = 30;
        this.currMonth = 'September';
        break;
      case 9:
        this.days = 31;
        this.currMonth = 'October';
        break;
      case 10:
        this.days = 30;
        this.currMonth = 'November';
        break;
      case 11:
        this.days = 31;
        this.currMonth = 'December';
    }
    this.firstDay = new Date(this.year, this.month, 1).getDay();
  }

  setDays() {
    //this accounts for the first day of the month not being a Sunday
    this.grids = this.days + this.firstDay;
  }

  //used to set trips from a specific day
  selectedDay(x) {
    let vals = new Array();
    for (let i = 0; i < this.events.length; i++) {
      let dateObj = this.events[i].scheduled_Date.split('-');
      let date = parseInt(dateObj[2], 10);

      if (date === x) {
        vals.push(this.events[i].id);
      }
    }

    if (vals.length > 0) {
      this.result.emit(vals);
    }
  }
}
