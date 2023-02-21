const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        console.log();

        this.listadoArr.forEach(({ desc, completadoEn }, index) => {
            console.log(`${(index + 1 + '.').green} ${desc} :: ${(completadoEn) ? 'Completada'.green : 'Pendiente'.red}`);
        });

    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let index = 0

        this.listadoArr.forEach(({ desc, completadoEn }) => {

            if (!!completadoEn === completadas) {
                index += 1;
                console.log(`${(index + '.').green} ${desc} :: ${(completadoEn) ? completadoEn.green : 'Pendiente'.red}`);
            }
        });

    }

    toggleComplete(ids = []) {
        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        })
    }

}

module.exports = Tareas;