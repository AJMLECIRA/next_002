import React, { useEffect } from 'react';
import Image from 'next/image';
import { Flex, Box, useDisclosure, Text, Link } from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import Draweradmin from './Draweradmin';
import * as styles from '../../styles/admin/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/pro-solid-svg-icons';
import { useRouter } from 'next/navigation';

// Athenticate user
import { useAuth } from '@/app/mwadmin/AuthContext';
import { useAdminAuth } from '@/app/mwadmin/hooks/useAdminAuth';

export default function NavBar() {
  useAdminAuth();
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  if (loading) {
    console.log('Loading...');
  }

  if (!user && !isAdmin) {
    console.log('Access Denied');
  } else {
    console.log('Welcome, Admin!');
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const Bell = () => <FontAwesomeIcon icon={faBell} size="2x" />;
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <Link href="/">
            <Image
              className="brand"
              src="/images/mwlogoDk.png"
              width={250}
              height={34}
              alt="Mirrorwold Logo"
            />
          </Link>
          <Box flexGrow="1" />
          <Text>{user && user.displayName.toUpperCase()}</Text>
          {user && (
            <>
              <Flex
                w={{ base: '5vw', md: '4vw', lg: '3vw' }}
                h="30px"
                _hover={{ cursor: 'pointer' }}
                justifyContent={'end'}
                alignItems={'center'}
              >
                <Bell />
              </Flex>

              <Flex
                w={{ base: '5vw', md: '4vw', lg: '3vw' }}
                h="30px"
                _hover={{ cursor: 'pointer' }}
                justifyContent={'end'}
                alignItems={'center'}
              >
                <AiOutlineMenu
                  className="icon"
                  style={{
                    transform: 'scale(2)',
                    fill: '#40474f',
                  }}
                  onClick={onOpen}
                />
              </Flex>
            </>
          )}
        </ul>
      </nav>
      <Draweradmin isOpen={isOpen} onClose={onClose}></Draweradmin>
    </>
  );
}
