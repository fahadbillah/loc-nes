import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';  

  location:any;
  
  setPosition(position){
    this.location = position.coords;
    let pos = JSON.parse(localStorage.getItem('userTrack'));
    let userTrack = [];
    const d = new Date();
    if (pos === null) {
      
      userTrack.push({lat: this.location.latitude, long: this.location.longitude, time: d});
    } else {
      userTrack = pos;      
      userTrack.push({lat: this.location.latitude, long: this.location.longitude, time: d});
    }
    localStorage.setItem('userTrack', JSON.stringify(userTrack));
    console.log(pos);
  }
  ngOnInit(){
    if(navigator.geolocation){
      this.keepTracking();
    };
  }

  keepTracking(){
    setTimeout (() => {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      console.log("Hello from setTimeout");
      this.keepTracking();
    }, 1000);
  }
}
