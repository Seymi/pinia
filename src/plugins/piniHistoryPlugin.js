import { ref, reactive } from 'vue';

export function piniHistoryPlugin({ pinia, app, store, options }) {
    const recordHistory = ref(true);
    const history = reactive([]);
    // products removed by undo will be saved to get them for redo
    const redoList = reactive([]);
    const trackRedoList = ref(true);
    history.push(JSON.stringify(usestore.$state));

    store.$subscribe((mutation, state) => {
        if (recordHistory.value) {
            history.push(JSON.stringify(state));
            //changes resets redoList, only undo is source for redo
            redoList.splice(0, redoList.length);
        }
    });

    return {
        undo: () => {
            if (history.length === 1) return;
            // when cart is not empty, undo is recorded for redo
            trackRedoList.value = !store.isEmpty;

            if (trackRedoList.value === true || history.length > 2) {
                recordHistory.value = false;

                // const lastOrder = history.slice(-1);
                // history.pop();
                // redoList.push(lastOrder);
                redoList.push(history.pop);

                if (history.length === 1) {
                    store.setEmpty(); // dadurch wird history.length wieder 2
                    trackRedoList.value = false;
                } else {
                    store.$state = JSON.parse(history.at(-1));
                    trackRedoList.value = true;
                }
                recordHistory.value = true;
            }
        },

        redo: () => {
            if (redoList.length > 0) {
                const recoverOrder = redoList.slice(-1);
                history.push(recoverOrder);
                redoList.pop();

                recordHistory.value = false;
                store.$state = JSON.parse(history.at(-1));
                recordHistory.value = true;
            }
        }
    }
}
