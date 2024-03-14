'use client';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Center,
  Input,
} from '@chakra-ui/react';
import useRecordUpdater from '@/app/mwadmin/hooks/useRecordUpdater'; // Import the new component

export default function EditRecordModal({ isOpen, onClose, record, onSave }) {
  const [editableRecord, setEditableRecord] = useState({});

  // load a record from selected row
  useEffect(() => {
    if (record) {
      setEditableRecord(record);
    }
  }, [record]);

  // update the record state when an items is changed
  const handleInputChange = (key, value) => {
    setEditableRecord({ ...editableRecord, [key]: value });
  };

  const updateRecord = useRecordUpdater(); // Get the update function from the hook

  const handleSave = async () => {
    await updateRecord(
      'allGlass',
      record.id,
      editableRecord,
      () => {
        onSave(editableRecord); // Update the parent component
        onClose(); // Close the modal
      },
      (error) => {
        console.error('Update error:', error); // Handle error
      }
    );
  };

  // Define which fields are editable
  const editableItems = ['Min', 'Max', 'm2'];
  const skipItems = ['cost'];
  const keyOrder = [
    'MWref',
    'MWName',
    'supref',
    'm2',
    'type',
    'Min',
    'Max',
    'supplier',
  ];
  const sortedKeys = keyOrder.filter(
    (key) => editableRecord && Object.keys(editableRecord).includes(key)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Glass Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {sortedKeys.map((key) => {
            if (skipItems.includes(key)) {
              return null;
            }

            const isEditable = editableItems.includes(key);

            return (
              <Box key={key}>
                <Center display="flex" height="3vw">
                  <Box width="50%" style={{ textTransform: 'capitalize' }}>
                    {key}:
                  </Box>
                  <Center width="100%">
                    {isEditable ? (
                      <Input
                        padding="0"
                        type="text"
                        textAlign="center"
                        color="#0cc6de"
                        value={editableRecord[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    ) : (
                      editableRecord[key]
                    )}
                  </Center>
                </Center>
              </Box>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
