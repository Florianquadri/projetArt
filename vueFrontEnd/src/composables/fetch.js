import { ref } from "vue";

export function useFetch(url, data = null) {
  if (data === null) {data = ref(null)};

  async function loadJson() {
    const res = await fetch(url);
    const json = await res.json();
    data.value = json;
  }

  loadJson();
console.log(data);
  return { data }


}

export function useFetchReactive(url, data = null) {
  if (data === null) {data = ref(null)};

  async function loadJson(url) {
    const res = await fetch(url);
    const json = await res.json();
    data.value = json;
  }

  loadJson();

  watchEffect(()=>{
    loadJson(url.value);
  })

console.log(data);
  return { data }


}
