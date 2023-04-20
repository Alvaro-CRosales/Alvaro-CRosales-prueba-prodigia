import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/reto1", (req: Request, res: Response) => {
  //Nota, el error era porque no estaba tipando(como deberia de haber hecho)
  const oracion: any = req.query.oracion?.toString();
  //Usamos split para crear el array
  const oracionArray: String[] = oracion?.split(" ");
  //Usamos reverse para voltear el array y asi conocer cual es la ultima palabra
  const oracionReverse: String[] = oracionArray.reverse();
  //accedemos al array y contamos las letra de la palabra
  console.log(oracionReverse[0].length);
});

app.get("/reto2", (req: Request, res: Response) => {
  //obtenemos la oracion
  const oracion: any = req.query.oracion?.toString();
  //Usamos split para crear el array
  const oracionArray: string[] = oracion?.split(", ");
  //Creamos la palabra mas larga

  function palabraMasLarga(oracionArray: string[]): string {
    // Ordenamos el array de palabras por tamano
    oracionArray.sort((a, b) => b.length - a.length);
    // Iteramos sobre cada palabra del array ordenado
    for (const palabra of oracionArray) {
      // Removemos la palabra actual del array
      const palabraSobrantes = oracionArray.filter((w) => w !== palabra);
      // Verificamos si la palabra actual puede ser construida con las palabras restantes
      if (verificar(palabra, palabraSobrantes)) {
        return palabra;
      }
    }

    //  Si no se encuentra ninguna palabra que pueda ser construida con las restantes,
    //  entonces no existe una palabra más larga formada por otras palabras
    return "Agregar palabras que puedan formarse";
  }

  function verificar(palabra: string, palabrasSobrantes: string[]): boolean {
    // Si la palabra es vacía o el array de palabras es vacío, entonces no se puede construir la palabra
    if (!palabra || !palabrasSobrantes || palabrasSobrantes.length === 0) {
      return false;
    }

    // Iteramos sobre cada letra de la palabra
    for (const letra of palabra) {
      // Si la letra no se encuentra en las palabras restantes, entonces no se puede construir la palabra
      if (!palabrasSobrantes.some((w) => w.includes(letra))) {
        return false;
      }
    }

    // Si se ha iterado por todas las letras de la palabra y cada letra se encuentra en las palabras restantes,
    // entonces se puede construir la palabra
    return true;
  }

  console.log(palabraMasLarga(oracionArray));
});

app.listen(port, () => {
  console.log(`Server on at por: ${port}`);
});

/*Dado un String arbitrario que puede contener caracteres alfanuméricos y el “espacio”, escribe un programa que determine la longitud de la última palabra. Las palabras son un grupo de caracteres separados por espacios. Ejm
- String: “La hora exacta es inexacta”, Resultado: 8
- String “”, Resultado: 0 */

// Dada una lista de palabras, escribe un programa para encontrar la palabra más larga en la lista hecha de otras palabras de la lista.
// Ejemplo:
// input: aguas, par, rayo, carro, paraguas, parquimetro, metro
// output: paraguas

