import { useEffect, useState } from "react";
import type { Pijama } from "../Types/Pijama";
import axios from "axios";

export function usePijamas() {
  const [pijamas, setPijamas] = useState<Pijama[]>([]);

  const url = "http://localhost:3001/produtos";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setPijamas(response.data);
      })
      .catch((error) => console.error("Algo deu errado: " + error));
  }, []);
  return { pijamas };
}
