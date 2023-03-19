import { MatSelectChange } from '@angular/material/select';
import { Fight, Fighter, Strats } from './model/fight';
import { FightService } from './services/fight.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: FightService, private _snackBar: MatSnackBar) {}

  lutaAtual!: number;

  fighter1!: Fighter;
  fighter2!: Fighter;
  strats1: Strats = {
    stratPunching: 0,
    stratKicking: 0,
    stratClinching: 0,
    stratTakedowns: 0,
    stratDirtyBoxing: 0,
    stratThaiClinch: 0,
    stratClinchTakedowns: 0,
    stratAvoidClinch: 0,
    stratGNP: 0,
    stratSub: 0,
    stratPositioning: 0,
    stratLNP: 0,
    stratStandUp: 0,
  };
  strats2!: Strats;
  fighters!: Fighter[];
  pbp!: string[];

  fight: Fight = {
    eventName: 'EVENTO',
    weightClass: 'MEIO_MEDIO',
    numberRounds: 3,
    titleBout: false,
    generatePBP: false,
    happened: false,
    fighter1: this.fighter1,
    fighter2: this.fighter2,
  };

  stratPunching: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratKicking: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratClinching: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratTakedowns: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);

  stratDirtyBoxing: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratThaiClinch: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratClinchTakedowns: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratAvoidClinch: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);

  stratGNP: FormControl = new FormControl(null, [Validators.maxLength(100)]);
  stratSub: FormControl = new FormControl(null, [Validators.maxLength(100)]);
  stratPositioning: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);
  stratLNP: FormControl = new FormControl(null, [Validators.maxLength(100)]);
  stratStandUp: FormControl = new FormControl(null, [
    Validators.maxLength(100),
  ]);

  ngOnInit(): void {
    this.findAllFighters();
  }

  create(): void {
    this.fight.fighter1 = this.fighter1;
    this.fight.fighter2 = this.fighter2;
    console.log(this.fight);
    this.service.create(this.fight).subscribe(
      (resposta) => {
        this.openSnackBarSuccess();
        this.service.updatePBP(resposta.id).subscribe((res) => {
          this.findFightById(resposta.id);
        });
      },
      (ex) => {
        console.log(ex);
        this.openSnackBarError();
      }
    );
  }

  update(): void {
    this.service.updateStrats(this.strats1).subscribe(
      (resposta) => {
        this.openSnackBarSuccess();
      },
      (ex) => {
        this.openSnackBarError();
      }
    );
  }

  openSnackBarSuccess() {
    this._snackBar.open('Sucesso!', '!!', { duration: 3000 });
  }

  openSnackBarError() {
    this._snackBar.open('Erro!', '!!', { duration: 3000 });
  }

  findAllFighters() {
    this.service.allFighters().subscribe((res) => {
      this.fighters = res;
    });
  }

  findFightById(id: any) {
    this.service.findById(id).subscribe((res) => {
      this.pbp = res.pbp;
    });
  }

  fighterStratsById1(id: any) {
    this.service.fighterStratsById(id).subscribe((res) => {
      this.strats1 = res;
    });
  }

  fighterStratsById2(id: any) {
    this.service.fighterStratsById(id).subscribe((res) => {
      this.strats2 = res;
    });
  }

  fighterById1(id: any) {
    this.service.fighterById(id).subscribe((res) => {
      this.fighter1 = res;
    });
  }

  fighterById2(id: any) {
    this.service.fighterById(id).subscribe((res) => {
      this.fighter2 = res;
    });
  }

  onSelect1(event: MatSelectChange) {
    this.fighterById1(event.value);
    this.fighterStratsById1(event.value);
  }

  onSelect2(event: MatSelectChange) {
    this.fighterById2(event.value);
    this.fighterStratsById2(event.value);
  }

  validCampos1(): boolean {
    const {
      stratPunching,
      stratKicking,
      stratClinching,
      stratTakedowns,
      stratDirtyBoxing,
      stratThaiClinch,
      stratClinchTakedowns,
      stratAvoidClinch,
      stratGNP,
      stratSub,
      stratPositioning,
      stratLNP,
      stratStandUp,
    } = this;

    const isStrats1Valid =
      this.strats1.stratKicking +
        this.strats1.stratClinching +
        this.strats1.stratTakedowns +
        this.strats1.stratPunching ==
      100;

    const isStrats2Valid =
      this.strats1.stratDirtyBoxing +
        this.strats1.stratThaiClinch +
        this.strats1.stratClinchTakedowns +
        this.strats1.stratAvoidClinch ==
      100;

    const isStrats3Valid =
      this.strats1.stratGNP +
        this.strats1.stratSub +
        this.strats1.stratPositioning +
        this.strats1.stratLNP +
        this.strats1.stratStandUp ==
      100;

    return (
      stratPunching.valid &&
      stratKicking.valid &&
      stratClinching.valid &&
      stratTakedowns.valid &&
      stratDirtyBoxing.valid &&
      stratThaiClinch.valid &&
      stratClinchTakedowns.valid &&
      stratAvoidClinch.valid &&
      stratGNP.valid &&
      stratSub.valid &&
      stratPositioning.valid &&
      stratLNP.valid &&
      stratStandUp.valid &&
      isStrats1Valid &&
      isStrats2Valid &&
      isStrats3Valid
    );
  }

  teste() {
    console.log(this.pbp);
  }

  validCampos2(): boolean {
    const {
      stratPunching,
      stratKicking,
      stratClinching,
      stratTakedowns,
      stratDirtyBoxing,
      stratThaiClinch,
      stratClinchTakedowns,
      stratAvoidClinch,
      stratGNP,
      stratSub,
      stratPositioning,
      stratLNP,
      stratStandUp,
    } = this;

    const isStrats1Valid =
      this.strats2.stratKicking +
        this.strats2.stratClinching +
        this.strats2.stratTakedowns +
        this.strats2.stratPunching ==
      100;

    const isStrats2Valid =
      this.strats2.stratDirtyBoxing +
        this.strats2.stratThaiClinch +
        this.strats2.stratClinchTakedowns +
        this.strats2.stratAvoidClinch ==
      100;

    const isStrats3Valid =
      this.strats2.stratGNP +
        this.strats2.stratSub +
        this.strats2.stratPositioning +
        this.strats2.stratLNP +
        this.strats2.stratStandUp ==
      100;

    return (
      stratPunching.valid &&
      stratKicking.valid &&
      stratClinching.valid &&
      stratTakedowns.valid &&
      stratDirtyBoxing.valid &&
      stratThaiClinch.valid &&
      stratClinchTakedowns.valid &&
      stratAvoidClinch.valid &&
      stratGNP.valid &&
      stratSub.valid &&
      stratPositioning.valid &&
      stratLNP.valid &&
      stratStandUp.valid &&
      isStrats1Valid &&
      isStrats2Valid &&
      isStrats3Valid
    );
  }
}
