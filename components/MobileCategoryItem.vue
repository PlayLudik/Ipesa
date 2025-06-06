<template>
    <div class="w-full px-6 py-3 flex items-center gap-3 transition-colors duration-200 cursor-pointer"
        @click="$emit('click', category)" @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="[
            isActive
                ? 'bg-[#F8D146] text-black'
                : isHovered
                    ? 'bg-[#444341] text-white'
                    : 'text-white'
        ]">
        <img :src="imageSrc" alt="icon" class="w-11 h-11 object-contain transition-all duration-200" />
        <span class="text-sm font-bold">{{ category }}</span>
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
    return props.isActive || isHovered.value
        ? `${base}-color.webp`
        : `${base}.webp`
})
</script>