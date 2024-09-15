<template>
    <div class="card" @click="sharedInformation" :style="{ backgroundColor: props.bgcolor ? props.bgcolor : 'rgb(27, 48, 65)' }">
        <template v-if="props.loading">
            <span class="loader"></span>
        </template>
        <template v-else>
            <p>id: {{props.id }}</p>
            <p>название: {{ props.name }}</p>
            <p>бюджет: {{ props.price }}</p>
            <p v-if="props.closest_task_at">дата: {{ props.closest_task_at }}</p>
            <div class="card-footer">
                <svg v-show="props.color" width="20" height="20">
                    <circle id="myCircle" cx="5" cy="10" r="5" fill="blue" />
                </svg>
                <p>{{ validTaskDate }}</p>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, computed} from "vue";

const props = defineProps({
    name: {type: String, required: true},
    id: Number,
    price: Number,
    closest_task_at: String,
    color: String,
    bgcolor: String,
    loading: Boolean
})

const emits = defineEmits(["selectCard"])

const sharedInformation = async () => {
    emits("selectCard", props.id)
}
const validTaskDate = computed(() => {
    switch (props.color) {
        case "#f3756d":
            return " - в будущем";
        case "#58b98f":
            return " - сегодня";
        case "#ffd710":
            return " - в прошлом";
        default:
            return "";
    }
})
</script>

<style lang="scss" scoped>
#myCircle {
    fill: v-bind("props.color");
}

.card {
  max-width: 250px;
  height: 180px;
  display: flex;
  flex-direction: column;
  text-overflow: clip;
  gap: 3px;
  user-select: none;
  cursor: pointer;
  color: white;

  padding: 35px;

  border: 1px solid rgba(255, 255, 255, .25);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

  backdrop-filter: blur(15px);
  &:hover {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.497);
  }
  &:active {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.497), 0 0 10px 1px rgba(255, 255, 255, 0.438);
  }

  &-footer {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    & svg {
        align-self: flex-end;
    }
  }
}


.loader {
    width: 48px;
    height: 48px;
    margin-left: 60px;
    margin-top: 35px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;

    &::before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        inset: 0px;
        border-radius: 50%;
        border: 5px solid white;
        animation: prixClipFix 2s linear infinite;
    }
}

@keyframes rotate {
    100%   {transform: rotate(360deg)}
}

@keyframes prixClipFix {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
}
</style>
  