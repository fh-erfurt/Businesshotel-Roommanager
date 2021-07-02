import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { Room } from '../../services/room/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms!: Room[];
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    // this.roomService.getRooms().subscribe((data: Room[])=>{
    //   console.log(data);
    //   this.rooms = data;
    // })
  }

}
