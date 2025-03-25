export const satelliteService = {
  findAll() {
    const satellites = [
      { id: 1, name: 'Astra 1KR', position: '19.2°E' },
      { id: 2, name: 'Hot Bird 13B', position: '13.0°E' },
    ];

    return satellites;
  },
};
