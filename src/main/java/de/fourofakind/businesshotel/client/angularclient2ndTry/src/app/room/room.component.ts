import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit {

  rooms!: Room[];
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((data: Room[])=>{
      console.log(data);
      this.rooms = data;
    })
  }

}
