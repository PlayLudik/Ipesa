<template>
    <div class="relative flex md:w-full w-32 h-32 cursor-pointer transition-colors duration-200"
        @click="$emit('click', category)">
        <!-- Flecha hacia arriba, solo si activo -->
        <div v-if="isActive"
            class="absolute right-0 top-0 md:hidden flex items-center justify-center z-10 bg-[#0F0F0F] h-[30px] w-full">
            <div class="w-0 h-0 border-l-[64px] border-r-[64px] border-b-[30px]
              border-l-transparent border-r-transparent border-b-[#F8D146]"></div>
        </div>

        <!-- Contenido principal (sin margen derecho) -->
        <div class="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 md:pr-4 px-2"
            :class="isActive ? 'bg-[#F8D146] text-black' : 'bg-[#0F0F0F] text-white'">
            <img :src="`/images/sidebar/${category.toLowerCase()}${isActive ? '-color' : ''}.webp`" alt="icon"
                class="md:w-28 w-16 md:mb-2 mb-0 md:mt-0 mt-2" />
            <span class="capitalize text-sm  font-bold text-center">{{ category }}</span>
        </div>

        <!-- Flecha encima, solo si activo -->
        <div v-if="isActive" class="absolute right-0 top-0 h-full md:flex hidden items-center z-10 bg-[#0F0F0F]">
            <div class="w-0 h-0 border-t-[56px] border-b-[56px] border-l-[15px] 
               border-t-transparent border-b-transparent border-l-[#F8D146]" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    category: String,
    isActive: Boolean,
})
defineEmits(['click'])
</script>
