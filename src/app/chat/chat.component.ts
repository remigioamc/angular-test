import { Component, OnInit, Inject } from '@angular/core';
import { GifService } from '../gif.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { Observable, throwError } from "rxjs";
import {
  map,
  startWith,
  switchMap,
  catchError,
  debounceTime,
  tap,
  finalize
} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  input_text = new FormControl();
  chat: { user_id: any; type: string; value: any }[] = [
    {user_id: 1, type: 'text', value: "Hola!"},
    {user_id: 1, type: 'gif', value: 
     "https://media1.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif?cid=e95f846222d9926867babf6419633819492ca69b855986de&rid=giphy.gif"},
    {user_id: 0, type: 'text', value: "Hola Remigio!"},
    {user_id: 1, type: 'text', value: "Por favor prueben la plataforma"},
  ];

  constructor(private _dialogGifSearch: MatDialog) { }

  ngOnInit(): void {
  }
  
  openGifSearch(): void {
    this._dialogGifSearch
      .open(GifSearch, {})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.chat.push({user_id: 0, type: 'gif', value: result.images.original.url})
        }
      });
  }

  addText(){
    if(!this.input_text.value) return
    this.chat.push({user_id: 0, type: 'text', value: this.input_text.value})
    this.input_text = new FormControl();
  }

}

@Component({
  selector: "gifsearch",
  templateUrl: "./gifsearch.component.html",
  styleUrls: ["./gifsearch.component.scss"]
})
export class GifSearch implements OnInit{
  search = new FormControl();
  gifs: Observable<[] | {}>;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GifSearch>,
    private gifService: GifService
  ) {

  }

  ngOnInit() {
    this.gifs = this.search.valueChanges.pipe(
      debounceTime(500),
      tap(_ => (this.loading = true)),
      startWith(""),
      switchMap(value =>
        this.gifService
          .search(value)
          .pipe(finalize(() => (this.loading = false)))
      ),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  selected(gif){
    this.dialogRef.close(gif);
  }
}
