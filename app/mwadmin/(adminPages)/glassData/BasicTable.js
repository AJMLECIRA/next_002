import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import useGetCollection from './GlassData';
import { COLUMNS } from './columns';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Box,
  Text,
} from '@chakra-ui/react';
import EditRecordModal from './EditRecordModal';

export const BasicTable = () => {
  const { data, loading, error } = useGetCollection('allGlass');
  const columns = useMemo(() => COLUMNS, []);
  const [glassData, setGlassData] = useState(data || []);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleRowClick = (record) => {
    console.log('open Editing ', record);
    setEditingRecord(record);
    setIsEditModalOpen(true);
    console.log('Is Edit Modal Open:', isEditModalOpen);
  };
  const handleSave = (updatedRecord) => {
    // Update the local state with the updated record
    const updatedData = glassData.map((editingRecord) =>
      editingRecord.id === updatedRecord.id ? updatedRecord : editingRecord
    );
    // updates the values in the list on the page
    setGlassData(updatedData);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: glassData,
      },
      useSortBy // Enable sorting
    );
  useEffect(() => {
    setGlassData(data || []);
  }, [data]);

  return (
    <Center margin="0 5vw">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <Th
                      key={key}
                      {...restColumnProps}
                      isNumeric={column.isNumeric}
                      style={{
                        fontSize: '1vw',
                        cursor: 'pointer',
                        justifyContent: 'space-between',
                        padding: '1vw 2vw 1vw 0',
                      }}
                    >
                      {column.render('Header')}
                      <span
                        // Add styles for sorting indicators
                        style={{
                          marginLeft: '0.5rem',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          width: '10px',
                        }}
                      >
                        {column.isSorted
                          ? column.isSortedDesc
                            ? '↓'
                            : '↑'
                          : ''}
                      </span>
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Tr
                key={key}
                {...restRowProps}
                _hover={{
                  background: 'rgba(12, 198, 222,0.1)',
                  cursor: 'pointer',
                }}
                onClick={() => handleRowClick(row.original)}
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <Td key={key} {...restCellProps} padding="0.2vw">
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {editingRecord && (
        <EditRecordModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditingRecord(null);
            setIsEditModalOpen(false);
          }}
          record={editingRecord}
          onSave={handleSave} // Pass handleSave to the modal
        />
      )}
    </Center>
  );
};
