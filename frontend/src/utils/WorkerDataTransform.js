function transformWorkerData(worker) {
    return {
        id: worker.id,
        name: `${worker.first_name} ${worker.last_name}`,
    };
}

export default transformWorkerData;
