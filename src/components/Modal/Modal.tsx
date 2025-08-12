import { createPortal } from "react-dom";
import type { Launch } from "../../types/types";
import { Group, Image, Text, Modal } from '@mantine/core';
import styles from './Modal.module.scss'

interface LaunchModalProps {
    launch: Launch;
    onClose: () => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({launch, onClose}) => {
    return createPortal (        
        <Modal      
        opened={true}
        onClose={onClose}
        title={launch.mission_name}
        size="lg"
        >
            {launch.links.mission_patch && (
                <Image 
                src={launch.links.mission_patch}
                height={200}
                alt={launch.mission_name}
                fit="contain"
                />
            )}

            <Group mt="md" className={styles.text__group} gap={0}>
                <Text fw={500}>Mission name:</Text>
                <Text c='dimmed'>{launch.mission_name}</Text>
            </Group>

            <Group mt="md" className={styles.text__group} gap={0}>
                <Text fw={500}>Rocket name: </Text>
                <Text c='dimmed'>{launch.rocket.rocket_name}</Text>
            </Group>

            <Group mt="md" className={styles.text__group} gap={0}>
                <Text fw={500}>Details: </Text>
                <Text>{launch.details || 'Нет дополнительной информации'}</Text>
            </Group>
        </Modal>,
        document.body
    )
} 