<?php
function drawResult($answer)
{ ?>
    <tr class="resultFromPhp">
        <th><?php echo $answer[0] ?></th>
        <th><?php echo $answer[1] ?></th>
        <th><?php echo $answer[2] ?></th>
        <th><?php echo $answer[3] ?></th>
        <th><?php echo $answer[4] ?></th>
        <th><?php echo $answer[5] ?> мсек</th>
    </tr>
    <?php
}