import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() address!: string;
  @Input() city!: string;
  @Input() country!: string;
  
  map!: google.maps.Map;
  geocoder!: google.maps.Geocoder;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const mapOptions = {
      zoom: 15,
      center: { lat: -34.397, lng: 150.644 },
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();

    this.geocodeAddress();
  }

  geocodeAddress(): void {
    const fullAddress = `${this.address}, ${this.city}, ${this.country}`;

    this.geocoder.geocode({ address: fullAddress }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        this.map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}