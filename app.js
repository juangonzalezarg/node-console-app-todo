require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    confirmar,
    inquirerMenu,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    pausa
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Crear opción                
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            case '3': // Listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // Listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleComplete(ids);
                break;
            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);


                if (id !== '0') {

                    const ok = await confirmar('¿Está seguro?');

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }


                break;

        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();