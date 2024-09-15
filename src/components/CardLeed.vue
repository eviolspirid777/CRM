<template>
    <div class="card-leed" @click="sharedInformation">
        <span>
            id: {{ props.id }}
        </span>
        <span>
            name: {{ props.name }}
        </span>
        <span>
            price: {{ props.price }}
        </span>
        <span v-if="props.closest_task_at">
            expiration: {{ props.closest_task_at }}
        </span>
        <svg v-if="props.color" width="20" height="20">
            <circle id="myCircle" cx="5" cy="5" r="5" fill="blue" />
        </svg>
    </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
    name: {type: String, required: true},
    id: Number,
    price: Number,
    closest_task_at: String,
    color: String
})

const emits = defineEmits(["selectCard"])

// const cardData = ref<Leed | undefined>(undefined)

// const fetchData = async () => {
//   const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxZTViM2RiODVjZmFkMWFmZmI2MGM3NmVkMTgxMzI5ZWExZTAzNzk3MzZiZGJlYjdiYjM1YzFmZTJiNDhhNzZlYmQxZmNkMWMzNTA0ZjVmIn0.eyJhdWQiOiI1YjRhMGQ5Ny02NTBjLTQ1NmMtYmI3My02NDI4YjUxM2VmYjYiLCJqdGkiOiI3MWU1YjNkYjg1Y2ZhZDFhZmZiNjBjNzZlZDE4MTMyOWVhMWUwMzc5NzM2YmRiZWI3YmIzNWMxZmUyYjQ4YTc2ZWJkMWZjZDFjMzUwNGY1ZiIsImlhdCI6MTcyNjM0MjgyMSwibmJmIjoxNzI2MzQyODIxLCJleHAiOjE3Mjc0ODE2MDAsInN1YiI6IjExNTIxMjY2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTUxNzk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMDg1YjBlN2EtMmVhYS00NzIyLWE3MjAtMzM2ZGJhYjc4YTk5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.TyCoNAKbzx57E94HFTDstWw9GLTcvc3A4YhsgzzO7w0TqamQdix0vj8WK9VlVKArertOqi5OcpyjKudk3YtPXqQ_f6vdy_bmsgP0GC3bha1My1B8c_rueHw26hWg-Y48uwOjcMcOUTNpS1egoCAgif6nyExCOONBosXR4B4VCAnKSksIGGPP2_JYFV2yEhubDAa4JV-VYYRdkYtdeo2Nz-TxkQ3Vr0iIVL_K7EnozSzj1HHpCTC4_Va8x6Az9sC7LPgHUmGrwN6aWHi-v98y7O1Kdk4fQr0MBO5IE6wcEuXvRGa2JL_zj3YsZOf9c37kB71KSQDo4oxCw-2YWboQZw"  
  
//   try {
//     const response = await axios.get(`/api/${props.id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//     cardData.value = response.data as Leed;
//   }
//   catch(ex) {
//     console.error("Error fetching", ex)
//   }
// }

const sharedInformation = async () => {
    // await fetchData()
    emits("selectCard", props.id)
}
</script>

<style lang="scss" scoped>
.card-leed {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px 10px;
    height: 200px;
    width: 300px;
    outline: 1px solid black;
    background-color: rgba(255, 230, 230, 0.38);
    &:hover {
        background-color: rgba(255, 255, 255, 0.463);
    }
    &__secret-info {
        display: flex;
        flex-flow: column nowrap;
        gap: 5px 0px;
    }
}
#myCircle {
    fill: v-bind("props.color");
}
</style>
  