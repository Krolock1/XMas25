<template>
    <div class="p-3 text-center flex flex-col gap-3 bg-green-100 text-2xl min-h-screen">
        <h2 class="font-bold"><img src="/pwa-192-192.png" alt="Glühweinrechner 2025" class="inline-block w-10 h-10 mr-2" />Glühweinrechner 2025</h2>
        <div 
        class="grid grid-cols-2 md:grid-cols-3 gap-2 auto-rows-fr"        
        >
            <div 
            v-for="item in xConfig" 
            :key="item.id" 
            class="border p-2 rounded-xl flex flex-col gap-1 text-center justify-center items-center text-stone-900"
            :class="item.background"
            @click="item.count++"
            >
                <div class="font-bold text-xl flex flex-wrap gap-0 items-center justify-center">
                    <span v-for="(name, index) in item.displayNames" :key="name">{{ name }}<template v-if="index < item.displayNames.length - 1">, </template></span>
                </div>
                <div class="grow"></div>
                <div v-if="item.amount > 0" class="text-base font-bold">
                    Preis: {{ item.amount.toFixed(2) }} €
                </div>
                <div class="text-white text-base">
                    gebucht: <span class="font-bold text-lg">{{ item.count }}</span> Stück
                </div>
            </div>
        </div>
        
        <div class="grow"/>
        
        <div class="rounded-xl bg-lime-300 p-2 pointer-events-none">
            <div class="text-2xl">Gesamtbetrag: <span class="text-4xl font-black">{{ amountTotal.toFixed(2) }} </span> €</div>
            <div class="text-sm">(Enthaltener Pfand: {{ deposit.toFixed(2) }} €)</div>
        </div>
        <div class="rounded-xl bg-red-600 text-white p-2" @click="clear">
            Zurücksetzen
        </div>
        <div class="text-xs text-gray-600 mb-1 h-16">
            © 2025 Markus Walgenbach
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
        background: 'bg-red-600',
        displayNames: ['Glühwein', 'Bier','Punsch Schuss', 'Softgetränk'],
        amount: 3,
        deposit: 2,
        count:0,
    },
    {
        id: 'child-drink',
        background: 'bg-amber-500',
        displayNames: ['Kinderpunsch'],
        amount: 2.5,
        deposit: 2,
        count:0,
    },
    {
        id: 'water-schnaps',
        background: 'bg-blue-300',
        displayNames: ['Wasser', 'Schnaps'],
        amount: 2,
        deposit: 2,
        count:0,
    },
    {
        id: 'special-drink',
        background: 'bg-red-400',
        displayNames: ['Glühwein mit Schuss'],
        amount: 3.5,
        deposit: 4,
        count:0,
    },
    {
        id: 'man-drink',
        background: 'bg-amber-600',
        displayNames: ['Herrengedeck'],
        amount: 4,
        deposit: 4,
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
