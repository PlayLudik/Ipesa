<template>
    <div class="relative flex w-full h-28 cursor-pointer transition-colors duration-200"
        @click="$emit('click', category)">
        <!-- Contenido principal (sin margen derecho) -->
        <div class="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 pr-4"
            :class="isActive ? 'bg-[#F8D146] text-black' : 'bg-[#0F0F0F] text-white'">
            <img :src="`/images/sidebar/${category.toLowerCase()}${isActive ? '-color' : ''}.png`" alt="icon"
                class="w-28 mb-2" />
            <span class="capitalize text-sm font-bold text-center">{{ category }}</span>
        </div>

        <!-- Flecha encima, solo si activo -->
        <div v-if="isActive" class="absolute right-0 top-0 h-full flex items-center z-10 bg-[#0F0F0F]">
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
