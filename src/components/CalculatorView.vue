<template>
    <div class="p-3 text-center">
        <h2 class="font-bold">Weihnachtsmarkt 2025</h2>
        <div 
        class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-1"        
        >
            <div 
            v-for="item in xConfig" 
            :key="item.id" 
            class="border p-2 rounded flex flex-col gap-2 text-center justify-center items-center"
            :class="item.background"
            @click="item.count++"
            >
                <div class="font-bold">
                    <div v-for="name in item.displayNames" :key="name">{{ name }}</div>
                </div>
                <div v-if="item.amount > 0">
                    Preis: {{ item.amount.toFixed(2) }} €
                </div>
                <div  v-if="item.amount > 0">
                    Pfand: {{ item.deposit.toFixed(2) }} €
                </div>
                <div>
                    gebucht: {{ item.count }} Stück
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

interface XItem {
    id: string,
    background: string,
    displayNames: string[],
    amount: number,
    deposit: number
    count:number
}
const xConfig: Ref<XItem[]> = ref(      [
    {
        id: 'main-drinks',
        background: 'bg-pink-600',
        displayNames: ['Glühwein', 'Punsch Schuss', 'Bier', 'Cola', 'Apfelschorle'],
        amount: 3,
        deposit: 2,
        count:0,
    },
    {
        id: 'special-drinks',
        background: 'bg-amber-600',
        displayNames: ['Glühwein Schuss'],
        amount: 3.5,
        deposit: 2,
        count:0,
    },
    {
        id: 'water-shnaps',
        background: 'bg-blue-600',
        displayNames: ['Wasser', 'Schnaps'],
        amount: 4,
        deposit: 2,
        count:0,
    },
    {
        id: 'food-items',
        background: 'bg-green-600',
        displayNames: ['Pfand zurück'],
        amount: 0,
        deposit: -2,
        count:0,
    },
])
const amount = computed(() => {
    return xConfig.value.reduce((sum, item) => sum + item.amount * item.count, 0);
});
const deposit = computed(() => {
    return xConfig.value.reduce((sum, item) => sum + item.deposit * item.count, 0);
});

const amountTotal = computed(() => amount.value + deposit.value);

const onAdd =(item: XItem)=> {
    item.count++;
}

</script>
