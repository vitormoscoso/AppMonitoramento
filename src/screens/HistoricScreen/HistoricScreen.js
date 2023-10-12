import { getData } from "../../services/apiClient";
// import { RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";

export default function HistoricScreen() {
  const [data, setData] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);

  async function getHistoricData() {
    // setRefreshing(true);
    const data = await getData(setData);
    setData(data);
    // setRefreshing(false);
  }

  useEffect(() => {
    getHistoricData();
  }, []);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([13]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data?.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <>
      {data !== null && data !== undefined ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nível</DataTable.Title>
            <DataTable.Title>Data</DataTable.Title>
          </DataTable.Header>

          {data?.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.value} cm</DataTable.Cell>
              <DataTable.Cell>{item.timestamp}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data?.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${data?.length}`}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
          />
        </DataTable>
      ) : (
        <Text>Carregando...</Text>
      )}
    </>
  );
}
