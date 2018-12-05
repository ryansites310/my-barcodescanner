import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { clearWatch, distance, enableLocationRequest,
    getCurrentLocation, isEnabled, Location, watchLocation  } from "nativescript-geolocation";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    watchId;
    tvLog: string;
    home: Location;
    constructor() {

        this.home = new Location();
        this.home.latitude = 40.715010;
        this.home.longitude = -84.189380;
        // Use the component constructor to inject providers.

        enableLocationRequest(true).then(() => {

            this.watchId = watchLocation((suc) => {
                console.log(suc);
                this.logEvent(JSON.stringify(suc));
                this.logDistance(suc);
            }, (err) => {
                console.log(err);
                this.logEvent(JSON.stringify(err));
            }, {desiredAccuracy: 3, updateDistance: 5, minimumUpdateTime : 1000 * 5});
        }, (error) => {
            console.log(error);
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    logEvent(s: string) {
        this.tvLog = this.tvLog + "\n" + s;
    }

    logDistance(current: Location) {
        this.logEvent("\n" + "Distance : " + distance(current, this.home));
    }
}
