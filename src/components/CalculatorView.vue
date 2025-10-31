<template>
    <div class="p-3 text-center grid grid-col gap-3 bg-green-100 text-2xl">
        <h2 class="font-bold">Weihnachtsmarkt 2025</h2>
        <div 
        class="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-fr"        
        >
            <div 
            v-for="item in xConfig" 
            :key="item.id" 
            class="border p-2 rounded-xl flex flex-col gap-2 text-center justify-center items-center"
            :class="item.background"
            @click="item.count++"
            >
                <div class="font-extrabold text-xl flex flex-wrap gap-1 items-center justify-center">
                    <span v-for="(name, index) in item.displayNames" :key="name">{{ name }}<template v-if="index < item.displayNames.length - 1">, </template></span>
                </div>
                <div class="grow"></div>
                <div v-if="item.amount > 0" class="text-base font-bold">
                    Preis: {{ item.amount.toFixed(2) }} €
                </div>
                <div  v-if="item.amount > 0" class="text-base font-bold">
                    Pfand: {{ item.deposit.toFixed(2) }} €
                </div>
                <div class="text-white text-base">
                    gebucht: <span class="font-bold text-lg">{{ item.count }}</span> Stück
                </div>
            </div>
        </div>
        
        <div class="grow"/>
        
        <div class="rounded-xl bg-lime-300 p-2">
            <div class="text-2xl">Gesamtbetrag: <span class="text-4xl font-black">{{ amountTotal.toFixed(2) }} </span> €</div>
            <div class="text-sm">(Enthaltener Pfand: {{ deposit.toFixed(2) }} €)</div>
        </div>
        <div class="rounded-xl bg-red-600 text-white p-2" @click="clear">
            Zurücksetzen
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
        background: 'bg-blue-300',
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

const clear = () => {
    xConfig.value.forEach(item => item.count = 0);
}

</script>
