import type { Launch } from "../../types/types";
import { Card, Image, Text, Group, Button } from '@mantine/core';
import styles from './Card.module.scss'

interface LaunchCardProps {
    launch: Launch;
    onSeeMore: (launch: Launch) => void;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({launch, onSeeMore}) => {
     return (
        <Card 
        shadow='sm' 
        padding='md' 
        radius='md' 
        withBorder
        w={250}
        h={300}
        className={styles.card}
        >
            <Card.Section>
                {launch.links.mission_patch_small && (
                    <Image 
                    src={launch.links.mission_patch_small}
                    h={100}
                    w={100}
                    alt={launch.mission_name}
                    className={styles.image}
                    />
                )}
            </Card.Section>

            <Group mt='md' mb='xs'>
                <Text fw={500} mt={10} lineClamp={1}>{launch.mission_name}</Text>
            </Group>

            <Text size="sm" c='dimmed'>
                {launch.rocket.rocket_name}
            </Text>

            <Button
            variant="filled"
            fullWidth
            mt='md'
            radius='md'
            onClick={() => onSeeMore(launch)}
            >
                See more
            </Button>
        </Card>
     )
}