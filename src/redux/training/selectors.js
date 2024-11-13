import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state) => state.training.tasks;

export const selectLoading = (state) => state.training.loading;

export const selectResponse = (state) => state.training.response;

export const selectResults = (state) => state.training.resultsTraining;

export const selectTotalTasks = (state) => {
  const tasks = selectTasks(state);
  return tasks.length;
};

export const selectTotalResponse = (state) => {
  const respons = selectResponse(state);
  return respons.length;
};

export const selectSortedResult = createSelector([selectResults], (results) => {
  const sortedResult = { corrects: [], mistakes: [] };

  results.forEach((result) => {
    if (result.isDone) {
      sortedResult.corrects.push(result);
    } else {
      sortedResult.mistakes.push(result);
    }
  });

  return sortedResult;
});
