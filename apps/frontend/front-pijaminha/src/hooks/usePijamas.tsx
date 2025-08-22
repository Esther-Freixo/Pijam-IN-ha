import { useEffect, useState } from "react";
import type { Pijama } from "../Types/Pijama";
import axios from "axios";

export function usePijamas() {
  const [pijamas, setPijamas] = useState<Pijama[]>([]);

  const url = "http://localhost:3333/pijamas";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {

        setPijamas(response.data.pajamas);

      })
      .catch((error) => console.error("Algo deu errado: " + error));
  }, []);
  return { pijamas };
}
