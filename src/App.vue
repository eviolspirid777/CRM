<template>
  <Table
    :dataSource="cardData"
    :columns="columns"
  />
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
    <CardLeed
      v-for="(data, key) in cardData"
      :key="`${key}-${tableRerender}`"
      :name="data.name"
      :color="data.color"
      :price="data.price"
      :closest_task_at="data.closest_task_at"
      :id="data.id"
      @selectCard="(id) => selectCard(id)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { Table } from 'ant-design-vue';
import {LeadDataLite, Leed} from "@/Types/Leeds"
import moment from "moment"
import CardLeed from "@/components/CardLeed.vue"

const leeds = ref<Leed | object>({})
const cardData = ref<LeadDataLite[] | object[]>([])
const previousId = ref<null | number>(null)
const tableRerender = ref(false)

const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Date',
    dataIndex: "closest_task_at",
    key:"closest_task_at"
  }
])

const fetchData = async () => {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxZTViM2RiODVjZmFkMWFmZmI2MGM3NmVkMTgxMzI5ZWExZTAzNzk3MzZiZGJlYjdiYjM1YzFmZTJiNDhhNzZlYmQxZmNkMWMzNTA0ZjVmIn0.eyJhdWQiOiI1YjRhMGQ5Ny02NTBjLTQ1NmMtYmI3My02NDI4YjUxM2VmYjYiLCJqdGkiOiI3MWU1YjNkYjg1Y2ZhZDFhZmZiNjBjNzZlZDE4MTMyOWVhMWUwMzc5NzM2YmRiZWI3YmIzNWMxZmUyYjQ4YTc2ZWJkMWZjZDFjMzUwNGY1ZiIsImlhdCI6MTcyNjM0MjgyMSwibmJmIjoxNzI2MzQyODIxLCJleHAiOjE3Mjc0ODE2MDAsInN1YiI6IjExNTIxMjY2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTUxNzk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMDg1YjBlN2EtMmVhYS00NzIyLWE3MjAtMzM2ZGJhYjc4YTk5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.TyCoNAKbzx57E94HFTDstWw9GLTcvc3A4YhsgzzO7w0TqamQdix0vj8WK9VlVKArertOqi5OcpyjKudk3YtPXqQ_f6vdy_bmsgP0GC3bha1My1B8c_rueHw26hWg-Y48uwOjcMcOUTNpS1egoCAgif6nyExCOONBosXR4B4VCAnKSksIGGPP2_JYFV2yEhubDAa4JV-VYYRdkYtdeo2Nz-TxkQ3Vr0iIVL_K7EnozSzj1HHpCTC4_Va8x6Az9sC7LPgHUmGrwN6aWHi-v98y7O1Kdk4fQr0MBO5IE6wcEuXvRGa2JL_zj3YsZOf9c37kB71KSQDo4oxCw-2YWboQZw"  
  
  try {
    const response = await axios.get("/api", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    leeds.value = response.data as Leed;
  }
  catch(ex) {
    console.error("Error fetching", ex)
  }
}

const fetchDataById = async (id: number) => {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxZTViM2RiODVjZmFkMWFmZmI2MGM3NmVkMTgxMzI5ZWExZTAzNzk3MzZiZGJlYjdiYjM1YzFmZTJiNDhhNzZlYmQxZmNkMWMzNTA0ZjVmIn0.eyJhdWQiOiI1YjRhMGQ5Ny02NTBjLTQ1NmMtYmI3My02NDI4YjUxM2VmYjYiLCJqdGkiOiI3MWU1YjNkYjg1Y2ZhZDFhZmZiNjBjNzZlZDE4MTMyOWVhMWUwMzc5NzM2YmRiZWI3YmIzNWMxZmUyYjQ4YTc2ZWJkMWZjZDFjMzUwNGY1ZiIsImlhdCI6MTcyNjM0MjgyMSwibmJmIjoxNzI2MzQyODIxLCJleHAiOjE3Mjc0ODE2MDAsInN1YiI6IjExNTIxMjY2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTUxNzk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMDg1YjBlN2EtMmVhYS00NzIyLWE3MjAtMzM2ZGJhYjc4YTk5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.TyCoNAKbzx57E94HFTDstWw9GLTcvc3A4YhsgzzO7w0TqamQdix0vj8WK9VlVKArertOqi5OcpyjKudk3YtPXqQ_f6vdy_bmsgP0GC3bha1My1B8c_rueHw26hWg-Y48uwOjcMcOUTNpS1egoCAgif6nyExCOONBosXR4B4VCAnKSksIGGPP2_JYFV2yEhubDAa4JV-VYYRdkYtdeo2Nz-TxkQ3Vr0iIVL_K7EnozSzj1HHpCTC4_Va8x6Az9sC7LPgHUmGrwN6aWHi-v98y7O1Kdk4fQr0MBO5IE6wcEuXvRGa2JL_zj3YsZOf9c37kB71KSQDo4oxCw-2YWboQZw"  
  
  try {
    const response = await axios.get(`/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data as LeadDataLite;
  }
  catch(ex) {
    console.error("Error fetching", ex)
  }
}

const selectCard = async (id: number) => {
  console.log(id)
  if (previousId.value === null) {
    previousId.value = id;

    // Используем Promise.all для асинхронного получения данных
    const updatedCardData = await Promise.all(cardData.value.map(async (el) => {
      if (el.id === previousId.value && previousId.value) {
        let { closest_task_at } = await fetchDataById(previousId.value) as LeadDataLite;

        closest_task_at = moment.unix(closest_task_at as number).format("DD.MM.YYYY");

        const currentDate = moment().startOf('day');
        let closest_task = moment(closest_task_at, "DD.MM.YYYY").startOf('day');

        const compareResult = currentDate.isBefore(closest_task) 
          ? 'before' 
          : currentDate.isSame(closest_task, 'day') 
          ? 'same' 
          : 'after';

        let color = '';
        switch (compareResult) {
          case 'before':
            color = "#f3756d";
            break;
          case 'same':
            color = "#58b98f";
            break;
          case 'after':
            color = "#ffd710";
            break;
        }
        console.log(closest_task_at, color);
        return { ...el, color: color, closest_task_at: closest_task_at };
      }
      return el; // Возвращаем элемент без изменений, если id не совпадает
    }));

    cardData.value = updatedCardData; // Обновляем значения cardData
    tableRerender.value = !tableRerender.value;

  } else {
    // Аналогично, обрабатываем и вторую ветку
    const updatedCardData = await Promise.all(cardData.value.map(async (el) => {
      if (el.id === previousId.value) {
        return { ...el, closest_task_at: null, color: "" };
      }

      let { closest_task_at } = await fetchDataById(previousId.value) as LeadDataLite;
      closest_task_at = moment.unix(closest_task_at as number).format("DD.MM.YYYY");

      const currentDate = moment().startOf('day');
      let closest_task = moment(closest_task_at, "DD.MM.YYYY").startOf('day');

      const compareResult = currentDate.isBefore(closest_task) 
        ? 'before' 
        : currentDate.isSame(closest_task, 'day') 
        ? 'same' 
        : 'after';

      let color = '';
      switch (compareResult) {
        case 'before':
          color = "#f3756d";
          break;
        case 'same':
          color = "#58b98f";
          break;
        case 'after':
          color = "#ffd710";
          break;
      }
      console.log(closest_task_at, color);
      return { ...el, color: color, closest_task_at: closest_task_at };
    }));

    cardData.value = updatedCardData;
    tableRerender.value = !tableRerender.value;
  }
}


const fillCardData = () => {
  cardData.value = [];
  (leeds.value as Leed)._embedded.leads.forEach(el => {
    let { name, id, price } = el;

    cardData.value.push({ name, id, price });
  });
};


onMounted(async () => {
  await fetchData();
  fillCardData()
})
</script>

<style lang="scss">

</style>
