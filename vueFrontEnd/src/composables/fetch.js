import { ref } from "vue";

export function useFetch(url, data = null) {
  if (data === null) {data = ref(null)};

  async function loadJson() {
    const res = await fetch(url);
    const json = await res.json();
    data.value = json;
  }

  loadJson();

  return { data }


}