import prompts from 'prompts';

import { MultiverseManager } from './classes/MultiverseManager.js';

import { db, initializeDB } from './database/database.js';

import { menuAddDimension } from './menu_prompt/add/addDimension.js';
import { menuAddSpecies } from './menu_prompt/add/addSpecies.js';
import { menuAddLocation } from './menu_prompt/add/addLocation.js';
import { menuAddCharacter} from './menu_prompt/add/addCharacter.js';
import { menuAddTravel } from './menu_prompt/add/addTravel.js';
import { menuAddExperiment } from './menu_prompt/add/addExperiment.js';
import { menuAddInvention } from './menu_prompt/add/addInvention.js';

import { menuRemoveDimension } from './menu_prompt/remove/removeDimension.js';
import { menuRemoveSpecies } from './menu_prompt/remove/removeSpecies.js';
import { menuRemoveLocation } from './menu_prompt/remove/removeLocation.js';
import { menuRemoveCharacter} from './menu_prompt/remove/removeCharacter.js';
import { menuRemoveTravel } from './menu_prompt/remove/removeTravel.js';
import { menuRemoveExperiment } from './menu_prompt/remove/removeExperiment.js';
import { menuRemoveInvention } from './menu_prompt/remove/removeInvention.js';

import { menuSearchAlternativeLocationOfACharacter } from './menu_prompt/search/searchAlternativeLocationOfACharacter.js';
import { menuSearchCharacter } from './menu_prompt/search/searchCharacter.js';
import { menuSearchInvention } from './menu_prompt/search/searchInvention.js';
import { menuSearchLocation } from './menu_prompt/search/searchLocation.js';

import { menuModifyDimension } from './menu_prompt/modify/modifyDimension.js';
import { menuModifySpecies } from './menu_prompt/modify/modifySpecies.js';
import { menuModifyLocation } from './menu_prompt/modify/modifyLocation.js';
import { menuModifyCharacter } from './menu_prompt/modify/modifyCharacter.js';
import { menuModifyInvention } from './menu_prompt/modify/modifyInvention.js';

import { menuCharacterReport } from './menu_prompt/report/characterReport.js';
import { menuDimensionReport } from './menu_prompt/report/dimensionReport.js';
import { menuInventionReport } from './menu_prompt/report/inventionReport.js';
import { menuTravelHistoryReport } from  './menu_prompt/report/travelHistoryReport.js';

async function main() {
  const multiverseManager = MultiverseManager.getInstance();
  await initializeDB();
  // cargar datos de la base de datos al gestor del multiverso
  const data = await db.read();
  if (db.data) {
    db.data.characters.forEach((c) => multiverseManager.addCharacter(c));
    db.data.dimensions.forEach((d) => multiverseManager.addDimension(d));
    db.data.inventions.forEach((i) => multiverseManager.addInvention(i));
    db.data.locations.forEach((l) => multiverseManager.addLocation(l));
    db.data.species.forEach((s) => multiverseManager.addSpecie(s));
    db.data.travels.forEach((t) => multiverseManager.addTravel(t));
    db.data.experiments.forEach((e) => multiverseManager.addExperiment(e));
  }

  let exit = false;
  while (!exit) {
    // opciones principales
    const response = await prompts({
      type: "select",
      name: "option",
      message: "¿Qué quieres hacer?",
      choices: [
        { title: "Añadir elementos", value: "add_element" },
        { title: "Eliminar elementos", value: "remove_element" },
        { title: "Buscar elementos", value: "search_element" },
        { title: "Modificar elementos", value: "modify_element" },
        { title: "Ejecutar un experimento", value: "execute_experiment" },
        { title: "Cambiar estado de un invento", value: "change_invention" },
        { title: "Generar reportes", value: "generate_reports" },
        { title: "Salir", value: "exit" }
      ]
    });

    // si se elege salir o no se elige ninguna opción, se sale del programa
    if (!response.option || response.option === 'exit') {
      exit = true;
      console.log("Saliendo del Multiverso...");
      continue;
    }

    try {
      switch (response.option) {

        // --------------- caso de añadir elementos ---------------
        case "add_element":
          const addChoice = await prompts({
            type: "select",
            name: "type",
            message: "¿Qué tipo de elemento deseas añadir?",
            choices: [
              { title: "Dimensión", value: "dimension" },
              { title: "Especie", value: "species" },
              { title: "Personaje", value: "character" },
              { title: "Invento", value: "invention" },
              { title: "Localización", value: "location" },
              { title: "Viaje", value: "travel" },
              { title: "Experimento", value: "experiment" },
              { title: "Cancelar", value: "cancel" }
            ]
          });

          if (addChoice.type === "cancel") {
            console.log("Operación cancelada.");
            break;
          }

          if (addChoice.type === "dimension") await menuAddDimension(multiverseManager);
          if (addChoice.type === "species") await menuAddSpecies(multiverseManager);
          if (addChoice.type === "character") await menuAddCharacter(multiverseManager);
          if (addChoice.type === "location") await menuAddLocation(multiverseManager);
          if (addChoice.type === "invention") await menuAddInvention(multiverseManager);
          if (addChoice.type === "travel") await menuAddTravel(multiverseManager);
          if (addChoice.type === "experiment") await menuAddExperiment(multiverseManager);

          break;


        // --------------- caso de eliminar elementos ---------------
        case "remove_element":
          const removeChoice = await prompts({
            type: "select",
            name: "type",
            message: "¿Qué tipo de elemento deseas eliminar?",
            choices: [
              { title: "Dimensión", value: "dimension" },
              { title: "Especie", value: "species" },
              { title: "Personaje", value: "character" },
              { title: "Invento", value: "invention" },
              { title: "Localización", value: "location" },
              { title: "Viaje", value: "travel" },
              { title: "Experimento", value: "experiment" },
              { title: "Cancelar", value: "cancel" }
            ]
          });
          
          if (removeChoice.type === "cancel") {
            console.log("Operación cancelada.");
            break;
          }

          if (removeChoice.type === "dimension") await menuRemoveDimension(multiverseManager);
          if (removeChoice.type === "species") await menuRemoveSpecies(multiverseManager);
          if (removeChoice.type === "character") await menuRemoveCharacter(multiverseManager);
          if (removeChoice.type === "location") await menuRemoveLocation(multiverseManager);
          if (removeChoice.type === "invention") await menuRemoveInvention(multiverseManager);
          if (removeChoice.type === "travel") await menuRemoveTravel(multiverseManager);
          if (removeChoice.type === "experiment") await menuRemoveExperiment(multiverseManager);

          break;

        // --------------- caso de buscar elementos ---------------
        case "search_element":
          const searchChoice = await prompts({
            type: "select",
            name: "type",
            message: "¿Qué tipo de elemento deseas buscar?",
            choices: [
              { title: "Personaje", value: "character" },
              { title: "Invento", value: "invention" },
              { title: "Localización", value: "location" },
              { title: "Localizaciones alternativas de un personaje", value: "alternative" },
              { title: "Cancelar", value: "cancel" }
            ]
          });

          if (searchChoice.type === "cancel") {
            console.log("Operación cancelada.");
            break;
          }

          if (searchChoice.type === "character") await menuSearchCharacter(multiverseManager);
          if (searchChoice.type === "invention") await menuSearchInvention(multiverseManager);
          if (searchChoice.type === "location") await menuSearchLocation(multiverseManager);
          if (searchChoice.type === "alternative") await menuSearchAlternativeLocationOfACharacter(multiverseManager);

          break;

        // --------------- caso de modificar elementos ---------------
        case "modify_element":
          const modifyChoice = await prompts({
            type: "select",
            name: "type",
            message: "¿Qué tipo de elemento deseas modificar?",
            choices: [
              { title: "Dimensión", value: "dimension" },
              { title: "Especie", value: "species" },
              { title: "Personaje", value: "character" },
              { title: "Invento", value: "invention" },
              { title: "Localización", value: "location" },
              { title: "Cancelar", value: "cancel" }
            ]
          });

          if (modifyChoice.type === "cancel") {
            console.log("Operación cancelada.");
            break;
          }

          if (modifyChoice.type === "dimension")  await menuModifyDimension(multiverseManager);        
          if (modifyChoice.type === "character") await menuModifyCharacter(multiverseManager);
          if (modifyChoice.type === "location") await menuModifyLocation(multiverseManager);
          if (modifyChoice.type === "species") await menuModifySpecies(multiverseManager);
          if (modifyChoice.type === "invention") await menuModifyInvention(multiverseManager);
              
          break;

        // --------------- caso de ejecutar un experimento ---------------
        case "execute_experiment":
          const experimentChoice = await prompts({
            type: "select",
            name: "experiment",
            message: "¿Qué experimento deseas ejecutar?",
              choices: multiverseManager.experiments.map(e => ({ title: `${e.name} (${e.id})`, value: e })),
          });
          multiverseManager.executeExperiment(experimentChoice.experiment);

          break;

        // --------------- caso de neutralizar un invento ---------------
        case "change_invention":
          const inventionChoice = await prompts([
            {type: "select",
             name: "change",
             message: "¿Qué acción deseas realizar con el invento?",
             choices: [
              { title: "Neutralizar un invento", value: "neutralize" },
              { title: "Desplegar un invento", value: "deploy" },
              { title: "Cancelar", value: "cancel" }
             ]
            },
            {type: "select",
             name: "invention",
             message: "¿Qué invento deseas cambiar?",
             choices: multiverseManager.inventions.map(i => ({ title: `${i.name} (${i.id})`, value: i })),
            }
          ]);

          if (inventionChoice.change === "cancel") {
            console.log("Operación cancelada.");
            break;
          }

          if (inventionChoice.change === "deploy") console.log(multiverseManager.InventionDeployment(inventionChoice.invention));
          if (inventionChoice.change === "neutralize") console.log(multiverseManager.InventionNeutralization(inventionChoice.invention));
          break;
      

        // --------------- caso de generar informes ---------------
        case "generate_reports":
          const reportChoice = await prompts({
            type: "select",
            name: "type",
            message: "¿Qué tipo de informe deseas generar?",
            choices: [
              { title: "Informe de dimensiones activas", value: "dimension_report" },
              { title: "Informe de inventos por nivel de peligro", value: "invention_report" },
              { title: "Informe de personajes y dimensiones visitadas", value: "character_report" },
              { title: "Informe de historia de viajes de un personaje", value: "travel_history_report" },
              { title: "Cancelar", value: "cancel" }
            ]
          });
          
          if (reportChoice.type === "cancel") {
            console.log("Operación cancelada.");
            break;
          }
          
          if (reportChoice.type === "dimension_report") await menuDimensionReport(multiverseManager);
          if (reportChoice.type === "invention_report") await menuInventionReport(multiverseManager);
          if (reportChoice.type === "character_report") await menuCharacterReport(multiverseManager);
          if (reportChoice.type === "travel_history_report") await menuTravelHistoryReport(multiverseManager);
          
          break;
      }
    } catch (error) { 
      console.error("Error al procesar la opción seleccionada:", error);
    }
  }

  // guardar datos del gestor del multiverso en la base de datos
  db.data.characters = multiverseManager.characters;
  db.data.dimensions = multiverseManager.dimensions;
  db.data.inventions = multiverseManager.inventions;
  db.data.locations = multiverseManager.locations;
  db.data.species = multiverseManager.species;
  db.data.travels = multiverseManager.travels;
  db.data.experiments = multiverseManager.experiments;
  await db.write();
}

main().catch(console.error);