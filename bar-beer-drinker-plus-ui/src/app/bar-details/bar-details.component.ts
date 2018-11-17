import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem } from '../bars.service';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';

declare const Highcharts: any;


@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  menu: BarMenuItem[];

  daysOfTheWeek: SelectItem [];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        });

      barService.getMenu(this.barName).subscribe(
        data => {
           this.menu = data;
        }
      );
    });

    this.daysOfTheWeek = [
      {
        'label': 'Sunday',
        'value': 'Sunday'
      },
      {
        'label': 'Monday',
        'value': 'Monday'
      },
      {
        'label': 'Tuesday',
        'value': 'Tuesday'
      },
      {
        'label': 'Wednesday',
        'value': 'Wednesday'
      },
      {
        'label': 'Thursday',
        'value': 'Thursday'
      },
      {
        'label': 'Friday',
        'value': 'Friday'
      },
      {
        'label': 'Saturday',
        'value': 'Saturday'
      }
    ];

    this.barService.getTopSpendersPerBar(this.barName).subscribe(
      data => {
        const customer = [];
        const counts = [];
    
        data.forEach(bar => {
          customer.push(bar.Customer);
          counts.push(bar.TotalSpent);
        });
        this.renderChartTopSpender(customer, counts, this.barName);
      });

      this.barService.getInventorySold(this.barName).subscribe(
        data => {
          const date = [];
          const percentage = [];
      
          data.forEach(bar => {
            date.push(bar.Date);
            percentage.push(bar.percentOfInventory);
          });
          this.renderChartInventorySold(date, percentage, this.barName);
        });

      this.setPopulateForDay('Sunday');
  }

  ngOnInit() {
  }


  setPopulateForDay(day : string){
    console.log("day of the week selected is: ", day);
    
    this.barService.getTopBrands(day).subscribe(
      data => {
        //console.log("data is: ", data);
        const customer = [];
        const counts = [];
    
        data.forEach(bar => {
          customer.push(bar.Customer);
          counts.push(bar.TotalSpent);
        });
        this.renderChartTopBrands(customer, counts, day);
      });

      this.barService.getDistributionTime(this.barName, day).subscribe(
        data => {
          console.log("data is: ", data);
          const date = [];
          const percentage = [];
      
          data.forEach(bar => {
            date.push(bar.Date);
            percentage.push(bar.percentOfInventory);
          });
          this.renderChartDistributionTime(date, percentage, day );
        });
  
 }
 
 renderChartDistributionTime(bars: string[], counts: number[], event: any) {
  Highcharts.chart('distributionTime', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Sale Distribution By Time For Day: '+ event + '.'
    },
    xAxis: {
      categories: bars,
      title: {
        text: 'Time of Day'
      }
    },
    yAxis: {
      allowDecimals: true,
      min: 0,
      title: {
        text: 'Percentage Sold'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: counts
    }]
  });
}

 renderChartDistributionDay(bars: string[], counts: number[], event: any) {
  Highcharts.chart('distributionDay', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Sale Distribution By Day For Bar '+ event + '.'
    },
    xAxis: {
      categories: bars,
      title: {
        text: 'Day Of The Week'
      }
    },
    yAxis: {
      allowDecimals: true,
      min: 0,
      title: {
        text: 'Percentage Sold'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: counts
    }]
  });
}

 renderChartInventorySold(bars: string[], counts: number[], event: any) {
  Highcharts.chart('inventorySold', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Average % Of Inventory Sold'
    },
    xAxis: {
      categories: bars,
      title: {
        text: 'Day Of The Week'
      }
    },
    yAxis: {
      allowDecimals: true,
      min: 0,
      title: {
        text: 'Percentage Sold'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: counts
    }]
  });
}

 renderChartTopBrands(bars: string[], counts: number[], event: any) {
  Highcharts.chart('topBrands', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Top Brands sold on '+ event + '.'
    },
    xAxis: {
      categories: bars,
      title: {
        text: 'Beer'
      }
    },
    yAxis: {
      allowDecimals: true,
      min: 0,
      title: {
        text: 'Amount Sold'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: counts
    }]
  });
}

 renderChartTopSpender(bars: string[], counts: number[], event: any) {
  Highcharts.chart('topSpender', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Top Spenders for Bar '+ event + '.'
    },
    xAxis: {
      categories: bars,
      title: {
        text: 'Spender Name'
      }
    }, tooltip: {
      pointFormat: '<span>${point.y:.f}</span>'
    },
    yAxis: {
      allowDecimals: true,
      min: 0,
      title: {
        text: 'Total Spent'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: counts
    }]
  });
}
}

