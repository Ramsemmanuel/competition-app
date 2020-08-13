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
    //this.downloading = true;
    this.download()
  }

   download() {
    let imgs = document.querySelectorAll(".card-body.Active .artwork-thumbnail")
    let totalFilesToDownload = imgs.length;
    let downloading = this.downloading
    for (var i = 0; i < imgs.length; i++) {
      (function(i) {
        var img = imgs[i];
        let currentImagURL = img["style"].backgroundImage.replace('url("','').replace('")','');
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            var link = document.createElement("a");
            link.href =  window.URL.createObjectURL(blob);;
            link.download = "";
            link.target="_blank";
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(blob)
            document.body.removeChild(link)
            totalFilesToDownload --;
            if(totalFilesToDownload == 0)
              downloading =false;
        };
        xhr.open('GET', currentImagURL);
        xhr.send();
    })(i);
      
      /*

      const fileRef = this.storage.storage.refFromURL(currentImagURL);
      fileRef.getDownloadURL().then(downloadURL => {
        debugger;
        

        if(downloadURL){
          
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);;
            link.download = GetFileName(downloadURL);
            link.target="_blank";
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
          };
          xhr.open('GET', downloadURL);
          xhr.send();
        }
    }).catch(function(error) {

      console.log(error)
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
    
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
    
        case 'storage/canceled':
          // User canceled the upload
          break;
    
          case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });;
    */
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
