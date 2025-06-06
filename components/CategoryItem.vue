<template>
    <div class="relative flex md:w-full w-32 h-32 cursor-pointer transition-colors duration-200"
        @click="$emit('click', category)" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <!-- Flecha hacia arriba (mobile), solo si activo -->
        <!-- <div v-if="isActive"
            class="absolute right-0 top-0 md:hidden flex items-center justify-center z-10 bg-[#0F0F0F] h-[30px] w-full">
            <div class="w-0 h-0 border-l-[64px] border-r-[64px] border-b-[30px]
              border-l-transparent border-r-transparent border-b-[#F8D146]" />
        </div> -->

        <!-- Contenido principal -->
        <div class="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 md:pr-4 px-2"
            :class="[
                isActive
                    ? 'bg-[#F8D146] text-black'
                    : isHovered
                        ? 'bg-[#444341] text-white'
                        : 'bg-[#0F0F0F] text-white'
            ]">
            <img :src="imageSrc" alt="icon"
                class="md:w-28 w-16 md:mb-2 mb-0 md:mt-0 mt-2 transition-all duration-200" />
            <span class="capitalize text-sm font-bold text-center">{{ category }}</span>
        </div>

        <!-- Flecha (desktop), solo si activo -->
        <div class="w-0 h-0 border-t-[64px] border-b-[64px] border-l-[15px]
         border-t-transparent border-b-transparent transition-colors duration-200" :class="{
            'border-l-[#F8D146]': isActive,
            'border-l-[#444341]': !isActive && isHovered,
            'border-l-transparent': !isActive && !isHovered
        }" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    category: String,
    isActive: Boolean
})

const emit = defineEmits(['click'])

const isHovered = ref(false)

const imageSrc = computed(() => {
    const base = `/images/sidebar/${props.category?.toLowerCase() || ''}`
    if (props.isActive || isHovered.value) return `${base}-color.webp`
    return `${base}.webp`
})
</script>
