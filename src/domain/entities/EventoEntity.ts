export class EventoEntity {
    readonly id: number;
    readonly name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static create(id: number, name: string): EventoEntity {
        return new EventoEntity(id, name);
    }
}
