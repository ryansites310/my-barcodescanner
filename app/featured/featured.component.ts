import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

import { BarcodeScanner } from "nativescript-barcodescanner";

@Component({
    selector: "Featured",
    moduleId: module.id,
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    constructor(private barcodeScanner: BarcodeScanner) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.

        console.log("hit ngOnInit");
    }

    scan() {
        this.checkAvailable();

        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            beepOnScan: true,
            reportDuplicates: true,
            preferFrontCamera: false
        })
            .then((result) => console.log(JSON.stringify(result)))
            .catch((error) => console.log(error));
    }

    request() {
        console.log("permission denied");
        this.barcodeScanner.requestCameraPermission().then(() => this.scan);
    }

    getCameraPermission() {
        this.barcodeScanner.hasCameraPermission()
            .then((granted) => granted ? this.scan() : this.request())
            .catch(() => {
                this.barcodeScanner.requestCameraPermission()
                    .then(() => this.scan());
            });
    }

    onScanResult(evt) {
        // console.log(evt.object);
        console.log(`onScanResult: ${evt.text} (${evt.format})`);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    checkAvailable() {
        this.barcodeScanner.available().then((avail) => {
            console.log("Available? " + avail);
        });
    }
}
