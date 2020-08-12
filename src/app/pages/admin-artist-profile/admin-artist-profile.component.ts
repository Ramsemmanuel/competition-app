import { Component, OnInit, Input } from '@angular/core';
import { CompetitionsService } from 'src/app/api/competitions/competitions.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-artist-profile',
  templateUrl: './admin-artist-profile.component.html',
  styleUrls: ['./admin-artist-profile.component.scss']
})
export class AdminArtistProfileComponent implements OnInit {

  @Input() userRecord:any;
  profileImage : any;
  loadingWorkData: boolean;
  userWorkData: any;
  selectedArtWork : number = 0;
  downloading: boolean;
    
  constructor(public competitionsProvider: CompetitionsService, private storage: AngularFireStorage,) { }

  ngOnInit() {
    this.profileImage = this.userRecord.imageUrl || "http://placehold.it/380x500";
    this.GetUserWork()
  }

  GetUserWork() {
    this.loadingWorkData = true;
    this.competitionsProvider.getArtworkEntryByUserId(this.userRecord.id).subscribe((data) => {
      this.userWorkData =data
      this.loadingWorkData = false;
    })
  }

  GetFileName(url){
    return url.split('/').pop().split('#')[0].split('?')[0];
  }

  ArtClick(e){
    if(!e.currentTarget.parentElement.classList.contains('Active')){
      this.selectedArtWork++; 
      e.currentTarget.parentElement.classList.add('Active')
    }
    else{
      e.currentTarget.parentElement.classList.remove('Active')
      this.selectedArtWork--;
    }
  }

  DownloadArtwork(){
    this.downloading = true;
    this.download()
  }

   download() {
    let imgs = document.querySelectorAll(".card-body.Active .artwork-thumbnail")
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var link = document.createElement("a");
      link.href = img["style"].backgroundImage.replace('url("','').replace('")','');
      link.download = this.GetFileName(link.href);
      link.target="_blank";
      link.style.display = "none";
      /*var evt = new MouseEvent("click", {
          "view": window,
          "bubbles": false,
          "cancelable": true
      });*/

      document.body.appendChild(link);
      //link.dispatchEvent(evt);
      //link.click();
      
      debugger

      const fileRef = this.storage.storage.refFromURL(link.href);
      fileRef.child(link.href).getDownloadURL().then(downloadURL => {
        debugger;
        if(downloadURL){
          
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open('GET', downloadURL);
          xhr.send();
        }
    });

    /*var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open('GET', link.href );
          xhr.send();

      document.body.removeChild(link);
      console.log("Downloading...");*/

    }
}

}
